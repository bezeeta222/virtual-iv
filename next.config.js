/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "reqres.in"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

const additionalConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_ID:
      "1055486050743-7o156relv0eicloog5rptah7veqcgt6h.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    NEXTAUTH_SECRET: "ByGasqn/u/ETBngMlXuj3LKIQ++OHvTngs1IPc+e+es=",
  },
};

module.exports = {
  ...nextConfig, // Merge the provided configuration
  ...additionalConfig, // Merge the additional configuration
};
