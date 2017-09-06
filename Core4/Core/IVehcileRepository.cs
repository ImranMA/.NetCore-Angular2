using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core4.Core.Models;
using Core4.Models;

namespace Core4.Core
{
    public interface IVehcileRepository
    {
        Task<QueryResult<Vehcile>> GetVehcile(VehcileQuery filter);
        Task<Vehcile> GetVehcile(int id, bool IncludeRelated = true);
        void  Add(Vehcile vehcile);
       void Remove(Vehcile vehcile);
    }
}
