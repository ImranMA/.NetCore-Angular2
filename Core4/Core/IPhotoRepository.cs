using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core4.Controllers.Resources;
using Core4.Core.Models;

namespace Core4.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehcileId);
    }
}
