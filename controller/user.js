import User from "../model/user.js"


export const register = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Create user with the role specified in the request
        const newUser = await User.create({
          fullName,
          email,
          password,
          role: role || 'buyer', // Default to 'buyer' if no role is provided
        });
    
        // Respond with the user details (don't send password back)
        res.status(201).json({
          message: "User created successfully",
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



