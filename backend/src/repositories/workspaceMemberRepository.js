module.exports = ({ models }) => {
  const WorkspaceMember = models.WorkspaceMember;
  return {
    create(data) {
      console.log('data', data);
      console.log('hello');
      return WorkspaceMember.create(data);
    },
    async update(id, data) {
      const [count, rows] = await WorkspaceMember.update(data, {
        where: { id },
        returning: true,
      });
      if (count === 0) return null;
      return rows[0];
    },
    fetchByWorkspace(workspaceId) {
      return WorkspaceMember.findAll({
        where: { workspaceId },
        raw: true,
      });
    },
  };
};
