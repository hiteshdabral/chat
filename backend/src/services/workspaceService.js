module.exports = ({ workspaceRepository, workspaceMemberRepository }) => {
  return {
    async create({ name }, user) {
      const workspace = await workspaceRepository.create({ name, ownerId: user.id });
      if (!workspace) {
        throw new Error('Failed to create workspace');
      }
      const res = workspaceMemberRepository.create({
        workspaceId: workspace.id,
        userId: user.id,
        role: 'admin',
      });
      return workspace;
    },
    update(id, { name }) {
      return workspaceRepository.update(id, { name });
    },
  };
};
