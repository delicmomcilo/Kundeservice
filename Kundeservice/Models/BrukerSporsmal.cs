using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Oblig3.Models
{
    public class BrukerSporsmal
    {
        public int ID { get; set; }

        [Required]
        [RegularExpression(@"^[A-Za-zæøåÆØÅ\- ]+$", ErrorMessage = "Fornavn er ikke gyldig. Kan bare være bokstaver")]
        public string Fornavn { get; set; }
        [Required]
        [RegularExpression(@"^[A-Za-zæøåÆØÅ\- ]+$", ErrorMessage = "Etternavnet er ikke gyldig. Kan bare være bokstaver")]
        public string Etternavn { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(@"^[A-Za-zæøåÆØÅ0-9_\-,\. ]+@[a-zA-Z0-9]+\.[a-zA-Z]+$", ErrorMessage = "Eposten er ikke gyldig")]
        public string Epost { get; set; }
        [Required]

        public string Sporsmal { get; set; }

        public string Svar { get; set; }

        public int Positiv { get; set; }
        public int Negativ { get; set; }

    }
}
