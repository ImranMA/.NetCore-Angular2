using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core4.Controllers.Resources;
using Core4.Core;
using Core4.Core.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Core4.Controllers
{
    [Route("/api/vehciles/{vehcileId}/photos")]
    public class PhotosController : Controller
    {
        
        private readonly IHostingEnvironment host;
        private readonly IVehcileRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService photoService;

        public PhotosController(IPhotoService photoService, IHostingEnvironment host, IVehcileRepository repository, IMapper mapper , IOptionsSnapshot<PhotoSettings> options, IPhotoRepository photoRepository)
        {
            this.photoSettings = options.Value;
            this.host = host;
            this.repository = repository;            
            this.mapper = mapper;
            this.photoRepository = photoRepository;
            this.photoService = photoService;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpGet("/api/vehciles/{vehcileId}/photos")]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehcileId)
        {
            var photo = await photoRepository.GetPhotos(vehcileId);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photo);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehcileId, IFormFile file )
        {

            var vehcile = await repository.GetVehcile(vehcileId,IncludeRelated:false);

            if (vehcile == null)
                return NotFound();


            if (file == null)
                return BadRequest("File not found");


            if (file.Length == 0)
                return BadRequest("Empty File");

            if (file.Length > photoSettings.MaxBytes)
                return BadRequest("Max File size");


            if (!photoSettings.isSupport(file.FileName))
             return BadRequest("Extension issue");



            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");

           var photo=  await photoService.UploadPhoto(vehcile, file, uploadFolderPath);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }

    }
}