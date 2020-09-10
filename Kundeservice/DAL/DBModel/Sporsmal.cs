using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Oblig3.DAL.DBModel
{
    public class Sporsmal
    {
        public int ID { get; set; }
        public DateTime LagtUt { get; set; }
        public string sporsmal { get; set; }
        public int positiv {get; set;}
        public int negativ {get; set;}

    }
}
