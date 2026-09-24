const { createClient } = require('@supabase/supabase-js');
const supabase = require('../db/supabase');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    const token = authHeader.substring(7);

    const {
      data: { user },
      error
    } = await supabase.auth.getUser(token);
 

    if (error || !user) {
      return res.status(401).json({
        error: 'Invalid or expired token'
      });
    }

    req.user = user;

    req.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PUBLISHABLE_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    );

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;