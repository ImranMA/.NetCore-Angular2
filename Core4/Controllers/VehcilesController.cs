using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core4.Controllers.Resources;
using Core4.Core;
using Core4.Core.Models;
using Core4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Core4.Controllers
{
    [Produces("application/json")]
    [Route("/api/vehciles")]
    public class VehcilesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehcileRepository repository;
        private readonly IUnitOfWork unitOfWork;


        public VehcilesController(IMapper mapper , IVehcileRepository repository , IUnitOfWork unitOfWork)
        {          
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;

        }

        [HttpPost]
        [Authorize]
        public  async  Task<IActionResult> CreateVehcile([FromBody] SaveVehcileResource vehcileResouce )
        {
            

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            

            var vehcile = mapper.Map<SaveVehcileResource, Vehcile>(vehcileResouce);
            vehcile.LastUpdate = DateTime.Now;

            repository.Add(vehcile);
            await unitOfWork.CompleteAsync();


            vehcile = await repository.GetVehcile(vehcile.Id);
            var Resutl = mapper.Map<Vehcile, VehcileResource>(vehcile);

            return Ok(Resutl);
        }



        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVehcile(int id , [FromBody] SaveVehcileResource vehcileResouce )
        {
           // throw new Exception("hey not good");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehcile = await repository.GetVehcile(id);


            if (vehcile == null)
                return NotFound();

            mapper.Map<SaveVehcileResource, Vehcile>(vehcileResouce, vehcile);
            vehcile.LastUpdate = DateTime.Now;
            
            await unitOfWork.CompleteAsync();

            vehcile = await repository.GetVehcile(vehcile.Id);
            var Resutl = mapper.Map<Vehcile, VehcileResource>(vehcile);

            return Ok(Resutl);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public  async Task<IActionResult> DeleteVehcile(int id)
        {  
            var vehcile = await repository.GetVehcile(id, IncludeRelated:false);

            if (vehcile == null)
                return NotFound();
   
            repository.Remove(vehcile);
            await unitOfWork.CompleteAsync();

            return Ok(id);

        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehcile(int id)
        {
            var vehcile = await repository.GetVehcile(id);
                
            if (vehcile == null)
                return NotFound();

            var vehcileRsource = mapper.Map<Vehcile, VehcileResource>(vehcile);

            return Ok(vehcileRsource);
        }



        [HttpGet]
        public async Task<QueryResultResource<VehcileResource>> GetVehcile( VehcileQueryResource filterresource)
        {
            var filter = mapper.Map<VehcileQueryResource, VehcileQuery>(filterresource);
            var queryResult = await repository.GetVehcile(filter);
            return mapper.Map<QueryResult<Vehcile>, QueryResultResource<VehcileResource>>(queryResult);
        }
    }
}