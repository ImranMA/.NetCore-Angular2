using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core4.Controllers.Resources;
using Core4.Models;
using System.Linq;
using Core4.Core.Models;

namespace Core4.Mapping
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {




            //Domain to API
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));


            CreateMap<Vehcile, SaveVehcileResource>()
                  .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                  .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            
            CreateMap<Vehcile, VehcileResource>()
                .ForMember(vr => vr.Make, opt=> opt.MapFrom(v=> v.Model.Make))
                 .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                  .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource { Id= vf.Feature.Id , Name = vf.Feature.Name})));


            //API to Domain


            CreateMap<VehcileQueryResource, VehcileQuery>();

            CreateMap<SaveVehcileResource, Vehcile>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore()).AfterMap((vr,v) => {
                    /* var removedFeatures = new List<VehcileFeature>();
                     foreach(var f in v.Features)
                     {
                         if (vr.Features.Contains(f.FeatureId))
                             removedFeatures.Add(f);
                     }
                     */

                    var RemovedFeatures = v.Features.ToList().Where(f => !vr.Features.Contains(f.FeatureId));

                    foreach (var f in RemovedFeatures)
                    {
                        v.Features.Remove(f);
                    }
                                 
                    
                    var addedFeatures =  vr.Features.ToList().Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehcileFeature { FeatureId = id }) ;

                    foreach (var f in addedFeatures)
                    {                      
                            v.Features.Add(f);
                    }

                });

        }
    }
}
