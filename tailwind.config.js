const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/da-apps-sdk/**/*.{js,ts,jsx,tsx}",
    "./node_modules/da-insight-sdk/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      fontSize: {
        xxs: "13px",
        xxxs: "12px",
        xxxxs: "11px",
      },
    },
  },
};

export default config;
