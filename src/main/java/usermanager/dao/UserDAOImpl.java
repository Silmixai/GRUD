package usermanager.dao;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import usermanager.domain.User;

import java.util.List;


@Repository
public class UserDAOImpl implements UserDAO {

    private static SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    @SuppressWarnings("unchecked")
    public List<User> userList(Integer begin, Integer step, String searchName) {

        Session session = sessionFactory.getCurrentSession();
        if (!(session.getTransaction() != null && session.getTransaction().isActive()))
            session.getTransaction().begin();

        String query;
        if (searchName == null || searchName.isEmpty()) query = "SELECT * FROM users";
        else query = "select * from users where name like '%" + searchName + "%'";

        List<User> result = session
                .createSQLQuery(query)
                .addEntity(User.class)
                .setFirstResult(begin)
                .setMaxResults(step)
                .list();

        session.getTransaction().commit();
        return result;
    }

    public void delete(Integer id) {
        Session session = sessionFactory.getCurrentSession();
        if (!(session.getTransaction() != null && session.getTransaction().isActive()))
            session.getTransaction().begin();

        User u = (User) session.get(User.class, id);
        if (u != null) session.delete(u);
        session.getTransaction().commit();
    }

    public void save(User user) {
        Session session = sessionFactory.getCurrentSession();
        if (!(session.getTransaction() != null && session.getTransaction().isActive()))
            session.getTransaction().begin();

        session.save(user);
        session.getTransaction().commit();
    }

    public void update(User u) {
        Session session = sessionFactory.getCurrentSession();
        if (!(session.getTransaction() != null && session.getTransaction().isActive()))
            session.getTransaction().begin();

        session.update(u);
        session.getTransaction().commit();
    }

    public Long size(String searchName) {
        Session session = sessionFactory.getCurrentSession();
        if (!(session.getTransaction() != null && session.getTransaction().isActive()))
            session.getTransaction().begin();

        Criteria crt = session.createCriteria(User.class);
        if (!(searchName == null || searchName.equals("")))
            crt.add(Restrictions.like("name", searchName));

        Long size = (Long) crt.setProjection(Projections.rowCount()).uniqueResult();
        session.getTransaction().commit();
        return size;
    }
}
