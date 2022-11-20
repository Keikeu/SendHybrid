import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Flexbox from "commons/components/Flexbox";
import Typography from "commons/components/Typography";
import callApi from "commons/util/callApi";
import Tabs from "commons/components/Tabs";
import Setting from "./Setting";
import Loader from "commons/components/Loader";

const Box = styled.div`
  position: relative;
  width: 508px;
  margin: 0 auto;
  padding: 40px 0 80px;
`;

const AbsoluteTabs = styled(Tabs)`
  position: absolute;
  left: -154px;
`;

const defaultTabs = [
  {
    id: "file_name",
    label: "File name",
  },
  {
    id: "images",
    label: "Images",
  },
  {
    id: "form",
    label: "Form",
  },
  {
    id: "optimization",
    label: "Optimization",
  },
  {
    id: "file_params",
    label: "File parameters",
  },
  {
    id: "lines",
    label: "Lines",
  },
  {
    id: "tint",
    label: "Tint",
  },
  {
    id: "font",
    label: "Font",
  },
];

const configStructure = {
  file_name: [
    {
      id: "forbiden_chars",
      label: "Forbiden chars",
      type: "select",
      value: [
        "~",
        '"',
        "#",
        "%",
        "&",
        "*",
        ":",
        "<",
        ">",
        "?",
        "!",
        "/",
        "\\",
        "{",
        "|",
        "}",
      ],
      options: [
        "~",
        '"',
        "#",
        "%",
        "&",
        "*",
        ":",
        "<",
        ">",
        "?",
        "!",
        "/",
        "\\",
        "{",
        "|",
        "}",
      ],
    },
    {
      id: "trim",
      label: "Trim",
      type: "select",
      value: ["space_before", "space_after"],
      options: ["space_before", "space_after"],
    },
    {
      id: "char_code",
      label: "Char code",
      type: "string",
      value: "UTF-8",
    },
    {
      id: "full_filename_length",
      label: "Full file name length",
      type: "number",
      value: 255,
    },
  ],
  images: [
    {
      id: "modes",
      label: "Modes",
      type: "select",
      value: ["CMYK", "8-bit"],
      options: ["CMYK", "8-bit"],
    },
    {
      id: "optimal_dpi_scale_1_to_1",
      label: "Optimal DPI scale 1 to 1",
      type: "number",
      value: 300,
    },
    {
      id: "min_dpi",
      label: "Minimum DPI",
      type: "number",
      value: 150,
    },
  ],
  form: [
    {
      id: "allowed",
      label: "Allowed",
      type: "bool",
      value: false,
    },
  ],
  optimization: [
    {
      id: "to_delete",
      label: "To delete",
      type: "select",
      value: ["tab", "hyperlink", "bad_links", "inactive_layers"],
      options: ["tab", "hyperlink", "bad_links", "inactive_layers"],
    },
    {
      id: "generation_type",
      label: "Generation type",
      type: "string",
      value: "composite",
    },
  ],
  file_params: [
    {
      id: "margin_bottom",
      label: "Margin bottom",
      type: "number",
      value: 8,
    },
    {
      id: "orientation",
      label: "Orientation",
      type: "string",
      value: "VERTICAL",
    },
    {
      id: "margin_top",
      label: "Margin top",
      type: "number",
      value: 10,
    },
    {
      id: "format",
      label: "Format",
      type: "string",
      value: "A4",
    },
    {
      id: "type",
      label: "Type",
      type: "string",
      value: "pdf",
    },
    {
      id: "pdf_version",
      label: "PDF version",
      type: "select",
      value: ["A-2", "A-4"],
      options: ["A-2", "A-4"],
    },
    {
      id: "margin_right",
      label: "Margin right",
      type: "number",
      value: 15,
    },
    {
      id: "forbiden_restrictions",
      label: "Forbiden restrictions",
      type: "select",
      value: [
        "password",
        "print",
        "edition",
        "copy",
        "edit",
        "other_based_on_certification",
      ],
      options: [
        "password",
        "print",
        "edition",
        "copy",
        "edit",
        "other_based_on_certification",
      ],
    },
    {
      id: "margin_left",
      label: "Margin left",
      type: "number",
      value: 15,
    },
  ],
  lines: [
    {
      id: "single_color_min_thickness",
      label: "Single color minimum thickness",
      type: "number",
      value: 0.1,
    },
    {
      id: "contra_or_multiple_color_min_thickness",
      label: "Contra or multiple color minimun thickness",
      type: "number",
      value: 0.5,
    },
  ],
  tint: [
    {
      id: "tint",
      label: "Tint",
      type: "string",
      value: "CMYK",
    },
  ],
  font: [
    {
      id: "multiple_color_one_element_font",
      label: "Multiple color one element font",
      type: "number",
      value: 8,
    },
    {
      id: "single_color_two_element_font",
      label: "Single color two element font",
      type: "number",
      value: 6,
    },
    {
      id: "rule",
      label: "Rule",
      type: "string",
      value: "embeded_in_doc",
    },
    {
      id: "single_color_one_element_font",
      label: "Single color one element font",
      type: "number",
      value: 5,
    },
    {
      id: "multiple_color_two_element_font",
      label: "Multiple color two element font",
      type: "number",
      value: 10,
    },
  ],
};

function Settings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState(defaultTabs[0]);

  useEffect(() => {
    async function fetchData() {
      const config = await callApi("config");
      setSettings(config);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <AbsoluteTabs
        direction="column"
        activeTabId={activeTab.id}
        setActiveTab={setActiveTab}
        tabs={defaultTabs}
      />
      <Typography variant="h2">{activeTab.label}</Typography>
      <Flexbox flexDirection="column" gap={16} margin="24px 0 0 0" isBordered>
        {configStructure[activeTab.id]?.map((el) => (
          <Setting
            key={el.id}
            type={el.type}
            label={el.label}
            value={settings[activeTab.id][el.id]}
            options={el.options}
            min={el.min}
            max={el.max}
            step={el.step}
            onChange={(value) => {
              setSettings((sett) => ({
                ...sett,
                [activeTab.id]: {
                  ...sett[activeTab.id],
                  [el.id]: value,
                },
              }));
            }}
          />
        ))}
      </Flexbox>
    </Box>
  );
}

export default Settings;
