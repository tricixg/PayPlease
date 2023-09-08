// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Material Kit 2 React components
import MKTypography from "./assets/components/MKTypography";

// Images
import logoPP from "./assets/images/logos/logo-payplease-wallet.png";

export default {
  brand: {
    name: "PayPlease",
    image: logoPP,
    route: "/",
  },
  socials: [
    {
      icon: <GitHubIcon />,
      link: "https://github.com/creativetimofficial",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", href: "https://www.creative-tim.com/presentation" },
        { name: "freebies", href: "https://www.creative-tim.com/templates/free" },
        { name: "premium tools", href: "https://www.creative-tim.com/templates/premium" },
        { name: "blog", href: "https://www.creative-tim.com/blog" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; 2023 PayPlease by{" "}
      <MKTypography
        component="a"
        href="https://www.creative-tim.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        eightkeh
      </MKTypography>
      .
    </MKTypography>
  ),
};
