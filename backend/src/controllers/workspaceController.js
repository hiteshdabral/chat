module.exports = ({ workspaceService }) => ({
  async createWorkspace(req, res) {
    try {
      const { user } = req;
      const workspace = await workspaceService.create(req.body, user);
      return res.status(200).json({ success: true, workspace });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ success: false, error: error.message ? error.message : 'Internal Server Error' });
    }
  },
  async updateWorkspace(req, res) {
    try {
      const workspace = await workspaceService.update(req.params.id, req.body);
      return res.status(200).json({ success: true, workspace });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ success: false, error: error.message ? error.message : 'Internal Server Error' });
    }
  },
});
