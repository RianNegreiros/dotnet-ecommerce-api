namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string firstName, string street, string state) 
        {
            this.FirstName = firstName;
            this.Street = street;
            this.State = state;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
    }
}