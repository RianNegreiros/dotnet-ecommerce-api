using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
  public class BasketItemDto
  {
    [Required]
    public int Id { get; set; }
    [Required]
    public string ProductName { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater than zero")]
    public decimal Price { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Qauantity must be greater than zero")]
    public int Qauantity { get; set; }
    [Required]
    public string PictureUrl { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Type { get; set; }
  }
}