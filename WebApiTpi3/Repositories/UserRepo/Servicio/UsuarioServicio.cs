using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using WebApiTpi.Dtos;
using WebApiTpi.Repositories.UserRepo;  
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;

namespace WebApiTpi.Repositories.UserRepo.Servicio
{
    public class UsuarioServicio
    {
        private readonly IUsuarioRepository _userRepository;
        private const string SecretKey = "una_clave_secreta_muy_segura_que_tenga_32_caracteres"; 

        public UsuarioServicio(IUsuarioRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public (string token, DateTime expiresAt) Authenticate(UsuarioDto usuarioDto)
        {
  
            var user = _userRepository.GetUserByUsername(usuarioDto.Usuario1);

           
            if (user == null || user.Contra != usuarioDto.Contra) 
            {
                throw new UnauthorizedAccessException("Nombre de usuario o contraseña incorrectos.");
            }

            
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Usuario1),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("IdUsuario", user.IdUsuario.ToString()),
                new Claim("Tipo", user.Tipo)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddMinutes(600);

            var token = new JwtSecurityToken(
                issuer: "tu_issuer",
                audience: "tu_audiencia",
                claims: claims,
                expires: expiry,
                signingCredentials: creds
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return (tokenString, expiry);
        }
    }
}
