using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core4.Models
{
    [Table("VehcileFeatures")]
    public class VehcileFeature
    {



        public int VehcileId { get; set; }
        public int FeatureId { get; set; }

        public Vehcile Vehcile { get; set; }

        public Feature Feature { get; set; }


    }
}
