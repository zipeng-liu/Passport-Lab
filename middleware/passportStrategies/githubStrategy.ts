import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { VerifyCallback } from 'passport-oauth2';
import { userModel } from '../../models/userModel';
import dotenv from 'dotenv'; 
dotenv.config();


if (typeof process.env.GITHUB_CLIENT_ID  !== "string" ) {
	throw Error("Github Client ID is not valid")
} 

if (typeof process.env.GITHUB_CLIENT_SECRET  !== "string" ) {
	throw Error("Github Client Secret is not valid")
} 


const githubStrategy: GitHubStrategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: "http://localhost:8000/auth/github/callback",
		passReqToCallback: true,
	},

	/* FIX ME 😭 */
	async (req: Express.Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
		try {
			const id = profile.id;
			const name = profile.displayName;
			const email = profile.email;
			const username = profile.username;
			const user = await userModel.findOrCreate(id, name, email, username);
			done(null, user);
	  } catch (error) {
			if (error instanceof Error) {
				console.error(error.message); 
			} else {
				done(new Error("An unknown error occurred"));
			}
	  }
	},
);

const passportGitHubStrategy: PassportStrategy = {
	name: 'github',
	strategy: githubStrategy,
};

export default passportGitHubStrategy;
