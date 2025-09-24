namespace PizzaApp.Shared.CustomExceptions.PizzaExceptions
{
    public class PizzaNotfoundException : Exception
    {
        public PizzaNotfoundException(string message) : base(message) { }
    }
}
