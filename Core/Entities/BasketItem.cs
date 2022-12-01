using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("BasketItems")]
    public class BasketItem : BaseEntity
    {
        public int Quantity { get; set; }
        public int productId { get; set; }
        public Product Product { get; set; }
        public int BaskeId { get; set; }
        public Basket Basket { get; set; }
    }
}