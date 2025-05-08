using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using backEnd_pizzaria;

namespace backEnd_pizzaria.Services
{
    public static class TokenService
    {
        public static string GenerateToken(Cliente cliente)
        {
            var key = Encoding.ASCII.GetBytes("sua-chave-secreta-super-segura"); // depois coloque no appsettings
            var tokenConfig = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, cliente.Nome),
                    new Claim(ClaimTypes.NameIdentifier, cliente.Id.ToString()),
                    new Claim(ClaimTypes.Email, cliente.Email),
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenConfig);
            return tokenHandler.WriteToken(token);
        }
    }
}
