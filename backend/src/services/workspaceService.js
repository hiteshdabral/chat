module.exports = ({ workspaceRepository }) => {
  return {
    create({ name }, user) {
      return workspaceRepository.create({ name, ownerId: user.id });
    },
    update(id, { name }) {
      return workspaceRepository.update(id, { name });
    },
  };
};
