module.exports = ({ userService }) => ({
  async register(req, res) {
    try {
      const user = await userService.registerUser(req.body);
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(error.status || 500)
        .json({ success: false, error: error.message ? error.message : 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const userLoginData = await userService.loginUser(req.body);
      res.json({ success: true, userLoginData });
    } catch (error) {
      console.log(error);
      res
        .status(error.status || 500)
        .json({ success: false, error: error.message ? error.message : 'Internal server error' });
    }
  },

  async logout(req, res) {
    try {
      const { user } = req;
      await userService.logout(user.id);
      res.status(302).json({ message: 'Logged out successfully' });
    } catch (error) {
      res
        .status(error.status || 500)
        .json(
          error.status
            ? response.error(null, null, error.message, null)
            : response.unhandledError(req, error, null)
        );
    }
  },
});
