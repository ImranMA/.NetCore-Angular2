using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core4.Core;
using Core4.Core.Models;    
using Core4.Extensions;
using Core4.Models;
using Microsoft.EntityFrameworkCore;

namespace Core4.Persistence
{
    public class VehcileRepository : IVehcileRepository
    {

        private readonly VegaDBContext context;
        public VehcileRepository(VegaDBContext context)
        {
            this.context = context;
        }


        public async Task<Vehcile> GetVehcile(int id , bool IncludeRelated = true)
        {
            if (!IncludeRelated)
                return await context.Vehciles.FindAsync(id);
         

            return await context.Vehciles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        } 


        
        public void Add(Vehcile vehcile)
        {
            context.Vehciles.Add(vehcile);
        }


        public void Remove(Vehcile vehcile)
        {
            context.Remove(vehcile);
        }

        public async Task<QueryResult<Vehcile>> GetVehcile(VehcileQuery queryObj)
        {

            var result = new QueryResult<Vehcile>();

            var query = context.Vehciles
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
               // .Include(v => v.Features)
                //.ThenInclude(vf => vf.Feature)
                .AsQueryable();



            var columnsMap = new Dictionary<string, Expression<Func<Vehcile, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,
                ["id"] = v => v.Id
            };
            query = query.ApplyFiltering(queryObj);
            
            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);

            result.Items=  await query.ToListAsync();

            return result;
        }


    }
}
