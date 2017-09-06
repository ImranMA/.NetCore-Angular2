using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core4.Controllers.Resources;
using Core4.Models;
using Core4.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Core4.Controllers
{
    [Produces("application/json")]
    [Route("api/Makes")]
    public class MakesController : Controller
    {
        private readonly VegaDBContext context;
        private readonly IMapper mapper;

        public MakesController(VegaDBContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
       


        [HttpGet("/api/Makes")]
        public async Task<IEnumerable<MakeResource>> GetMake()
        {
            var Makes =  await context.Makes.Include(m => m.Models).ToListAsync();
            return mapper.Map<List<Make>,List<MakeResource>>(Makes);
        }
    }
}