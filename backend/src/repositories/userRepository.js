module.exports = ({ models }) => {
  const User = models.User;
  this.at;
  return {
    create(data) {
      return User.create(data);
    },

    findByEmail(email) {
      return User.findOne({ where: { email }, attributes: ['id'], raw: true });
    },

    findForAuth(email) {
      return User.scope('withPassword').findOne({
        where: { email },
      });
    },
  };
};
