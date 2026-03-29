module.exports = ({ workspaceMemberRepository }) => {
  return {
    fetchByWorkspace(workspaceId) {
      return workspaceMemberRepository.fetchByWorkspace(workspaceId);
    },
    create(data) {
      return workspaceMemberRepository.create(data);
    },
    async update(id, data) {
      const [count, rows] = await workspaceMemberRepository.update(id, data);
      if (count === 0) return null;
      return rows[0];
    },
  };
};
