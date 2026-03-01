module.exports = ({ models }) => {
  const Workspace = models.Workspace;
  return {
    create(data) {
      return Workspace.create(data);
    },
    async update(id, data) {
      const [count, rows] = await Workspace.update(data, {
        where: { id },
        returning: true,
      });
      if (count === 0) return null;
      return rows[0];
    },
  };
};
