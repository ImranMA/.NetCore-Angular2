using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core4.Core.Models;
using Core4.Models;
using Microsoft.AspNetCore.Http;

namespace Core4.Core
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage photoStorage;

        
        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            this.unitOfWork = unitOfWork;
            this.photoStorage = photoStorage;
        }
        public async Task<Photo> UploadPhoto(Vehcile vehcile, IFormFile file,string uploadFolderPath)
        {            
            var fileName = await photoStorage.StorePhoto(uploadFolderPath, file);
            var photo = new Photo { FileName = fileName };

            vehcile.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return photo;
        }
    }
}
