export default {
	branches: ["main"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		"@semantic-release/changelog",
		"@semantic-release/npm",
		"@semantic-release/github",
	],
	preset: "conventionalcommits",
};
