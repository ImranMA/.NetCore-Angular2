using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core4.Core.Models;
using Core4.Models;
using Microsoft.AspNetCore.Http;

namespace Core4.Core
{
    public interface IPhotoService
    {
        Task<Photo> UploadPhoto(Vehcile vehcile, IFormFile file, string UploadFolderPath);
    }

}
