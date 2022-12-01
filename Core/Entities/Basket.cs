namespace Core.Entities
{
    public class Basket : BaseEntity
    {
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.Id != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.Id == product.Id);

            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.Id == productId);

            if (item == null) return;

            item.Quantity -= quantity;

            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}