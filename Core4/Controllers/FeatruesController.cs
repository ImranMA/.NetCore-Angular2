using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core4.Controllers.Resources;
using Core4.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core4.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Core4.Controllers
{
    [Produces("application/json")]
    [Route("api/Featrues")]
    public class FeatruesController : Controller
    {
        private readonly VegaDBContext context;
        private readonly IMapper mapper;

        public FeatruesController(VegaDBContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }


        [HttpGet("/api/Featrues")]
       //[Authorize]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var Features = await context.Features.ToListAsync();
            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(Features);
        }
    }
}