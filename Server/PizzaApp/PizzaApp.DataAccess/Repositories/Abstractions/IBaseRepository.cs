namespace PizzaApp.DataAccess.Repositories.Abstractions
{
    public interface IBaseRepository<T> //where T : class => where keyword is a constaint so T can only be a class
    {
        Task Add(T entity);
        Task Update(T entity);
        Task Remove(T entity);
        Task<T> GetById(string id);
        Task<T> GetByIdInt(int id);
        Task<List<T>> GetAll();
        Task SaveChanges();
    }
}
