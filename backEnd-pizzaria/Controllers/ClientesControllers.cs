using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backEnd_pizzaria.Data
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesControllers : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ClientesControllers(AppDbContext appDbContext) {
            _appDbContext = appDbContext;
        }
    }
}