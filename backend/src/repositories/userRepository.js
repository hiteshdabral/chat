module.exports = ({ models }) => {
  const User = models.User;
  return {
    create(data) {
      return User.create(data);
    },
    update(id, data) {
      return User.update(data, {
        where: { id },
      });
    },

    findById(id) {
      return User.findByPk(id);
    },

    findByEmail(email) {
      return User.findOne({ where: { email }, attributes: ['id'], raw: true });
    },

    findForAuth(email) {
      return User.scope('withPassword').findOne({
        where: { email },
      });
    },

    findByIdForAuth(id) {
      return User.scope('withPassword').findByPk(id);
    },
  };
};
