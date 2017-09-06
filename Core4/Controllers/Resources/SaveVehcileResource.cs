using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Core4.Controllers.Resources
{

    public class SaveVehcileResource
    {
        public int Id { get; set; }
        public int ModelId { get; set; }


        
        public bool isRegistered { get; set; }

        [Required]
        public ContactResource Contact{ get; set; }


     

        public ICollection<int> Features { get; set; }

         SaveVehcileResource() {
            Features = new Collection<int>();
        }

    }
}
