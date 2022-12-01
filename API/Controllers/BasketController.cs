using API.Dtos;
using AutoMapper;
using Core.Entities;
using Infra.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class BasketController : BaseApiController
	{
		private readonly StoreContext _context;
        private readonly IMapper _mapper;
		public BasketController(StoreContext context)
		{
			_context = context;
		}

		[HttpGet(Name = "GetBasket")]
		public async Task<ActionResult<BasketDto>> GetBasket()
		{
			var basket = await RetrieveBasket(GetBuyerId());

			if (basket == null) return NotFound();
			return _mapper.Map<Basket, BasketDto>(basket);
		}

		[HttpPost]
		public async Task<IActionResult> AddItemToBasket(int productId, int quantity)
		{
			var basket = await RetrieveBasket(GetBuyerId());
			if (basket == null) basket = CreateBasket();

			var product = await _context.Products.FindAsync(productId);
			if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

			basket.AddItem(product, quantity);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return CreatedAtRoute("GetBasket", basket);

			return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
		}

		[HttpDelete]
		public async Task<IActionResult> RemoveBasketItem(int productId, int quantity)
		{
			var basket = await RetrieveBasket(GetBuyerId());
			if (basket == null) return NotFound();

			basket.RemoveItem(productId, quantity);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return Ok();

			return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
		}

		private async Task<Basket> RetrieveBasket(string buyerId)
		{
			if (string.IsNullOrEmpty(buyerId))
			{
				Response.Cookies.Delete("buyerId");

				return null;
			}

			return await _context.Baskets
				.Include(i => i.Items)
				.ThenInclude(p => p.Product)
				.FirstOrDefaultAsync(x => x.BuyerId == buyerId);
		}

		private string GetBuyerId()
		{
			return User.Identity?.Name ?? Request.Cookies["buyerId"];
		}

		private Basket CreateBasket()
		{
			var buyerId = User.Identity?.Name;

			if (string.IsNullOrEmpty(buyerId))
			{
				buyerId = Guid.NewGuid().ToString();

				var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

				Response.Cookies.Append("buyerId", buyerId, cookieOptions);
			}

			var basket = new Basket { BuyerId = buyerId };

			_context.Baskets.Add(basket);

			return basket;
		}
	}
}