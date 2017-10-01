using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core4.Core;
using Core4.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Core4.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDBContext context;
        public PhotoRepository(VegaDBContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Photo>> GetPhotos(int vehcileId)
        {
            return await context.Photos.Where(p => p.vehcileId == vehcileId).ToListAsync();
        }

    }
}
