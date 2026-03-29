module.exports = ({ workspaceMemberService }) => {
  return {
    async fetchByWorkspace(req, res) {
      const { workspaceId } = req.params;
      const members = await workspaceMemberService.fetchByWorkspace(workspaceId);
      return res.json(members);
    },
  };
};
