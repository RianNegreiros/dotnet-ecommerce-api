using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infra.Data.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "John Doe",
                    Email = "test@mail.com",
                    UserName = "test@mail.com",
                    Address = new Address
                    {
                        FirstName = "John",
                        LastName = "Doe",
                        // https://www.fakepersongenerator.com/random-address
                        Street = "4128 Melrose Street",
                        City = "Ritzville",
                        State = "WA",
                        ZipCode = "99169"
                    }
                };

                await userManager.CreateAsync(user, "Password123!");
            }
        }
    }
}