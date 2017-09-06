using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Core4.Models;

namespace Core4.Controllers.Resources
{
    public class VehcileResource
    {
        public int Id { get; set; }
        
        public KeyValuePairResource Model { get; set; }


        public KeyValuePairResource Make { get; set; }


        public bool isRegistered { get; set; }

        public ContactResource Contact { get; set; }
        public DateTime LastUpdate { get; set; }

        public ICollection<KeyValuePairResource> Features { get; set; }


        public VehcileResource()
        {
            Features = new Collection<KeyValuePairResource>();
        }
    }
}
