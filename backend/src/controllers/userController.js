module.exports = ({ userService }) => ({
  async findMe(req, res) {
    try {
      const { user } = req;
      const fetchedUser = await userService.getUserById(user.id);
      res.status(200).json({ status: true, fetchedUser });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, error: error.message ? error.message : 'Internal server error' });
    }
  },
});
