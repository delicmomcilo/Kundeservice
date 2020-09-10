using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oblig3.DAL.DBModel
{
    public class Svar
    {
        public int ID { get; set; }
        public DateTime Svart { get; set; }
        public string SvartAv { get; set; }
        public string SvarSpm { get; set; }
    }
}
