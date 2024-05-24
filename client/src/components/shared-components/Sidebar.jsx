import { useState, forwardRef, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import SvgIcon from "@mui/material/SvgIcon";
import Collapse from "@mui/material/Collapse";
import { alpha, styled } from "@mui/material/styles";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import CloseSidebarIcon from "../../images/CloseSidebarIcon";
import OpenSidebarIcon from "../../images/OpenSidebarIcon";
import ListNamesIcon from "../../images/ListNamesIcon";
import SearchIcon from "../../images/SearchIcon";
import { Typography } from "@mui/material";
import { formatMessage as translate } from "devextreme/localization";
import AppContext from "../../context/app-context";
import axios from "axios";
import { Actions } from "../../context/APIState";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function StatusSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{
        width: 14,
        height: 14,
        opacity: 1,
      }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 5.8V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8Z"
          fill={props.fill}
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const CustomTreeItem = forwardRef((props, ref) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default function Sidebar({ style = {}, component = "Waterfall" }) {
  const { hierarchy, setHierarchy, sidebarOpened, setSidebarOpened } =
    useContext(AppContext);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  useEffect(() => {
    if (!hierarchy) {
      axios
        .get(Actions.GetFlowmeterHierarchy, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMThmMTE1YS1lMzhhLTQzYWYtYmRlZi0yMzhhODFhZGNjZDQiLCJlbWFpbCI6IlBWX0ZpcnN0QG1hbnVsb2lsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDE4ZjExNWEtZTM4YS00M2FmLWJkZWYtMjM4YTgxYWRjY2Q0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiUFZfRmlyc3RAbWFudWxvaWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsIkp3dFRva2VuSWQiOiJkOTc5ZGE3ZS05MmE5LTQyNGMtYjkyNC1mYTZhYzA5NGEyZGIiLCJleHAiOjE3MTQ3MzQ4MzEsImlzcyI6Ik9wdGl3ZWxsIiwiYXVkIjoiT3B0aXdlbGwifQ._nNp_UbdNH9ytBSn1q_fYOLgvnq7oG62_uso0I_2uIY`,
          },
        })
        .then((response) => {
          console.log("response", response.data.assets[0]);
          setHierarchy(response.data.assets[0]);
        });
    }
  }, [hierarchy]);

  const [searchValue, setSearchValue] = useState("");
  console.log("hierarchy from sidebar", hierarchy);

  useEffect(() => {
    if (sidebarOpened) {
      setSidebarWidth(300);
    } else {
      setSidebarWidth(56);
    }
  }, [sidebarOpened]);

  useEffect(() => {
    console.log("sidebar width", sidebarWidth);
    console.log("max width", 300);
  }, [sidebarWidth]);

  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    if (searchValue !== "") {
      for (let i = 0; i < hierarchy.subAssets.length; i++) {
        if (
          hierarchy.subAssets[i].name.toLowerCase() ===
            searchValue.toLowerCase() &&
          component === "SelectedPage"
        ) {
          setSelected(hierarchy.subAssets[i].assetId);
          localStorage.setItem(
            "selectedDeviceId",
            hierarchy.subAssets[i].assetId
          );
          return;
        }
        for (let j = 0; j < hierarchy.subAssets[i].subAssets.length; j++) {
          if (
            hierarchy.subAssets[i].subAssets[j].name.toLowerCase() ===
              searchValue.toLowerCase() &&
            component === "SelectedPage"
          ) {
            setSelected(hierarchy.subAssets[i].subAssets[j].assetId);
            localStorage.setItem(
              "selectedDeviceId",
              hierarchy.subAssets[i].subAssets[j].assetId
            );
            return;
          }
          for (
            let k = 0;
            k < hierarchy.subAssets[i].subAssets[j].subAssets.length;
            k++
          ) {
            if (
              hierarchy.subAssets[i].subAssets[j].subAssets[
                k
              ].name.toLowerCase() === searchValue.toLowerCase() &&
              component === "SelectedPage"
            ) {
              setSelected(
                hierarchy.subAssets[i].subAssets[j].subAssets[k].assetId
              );
              localStorage.setItem(
                "selectedDeviceId",
                hierarchy.subAssets[i].subAssets[j].subAssets[k].assetId
              );
              return;
            } else if (
              hierarchy.subAssets[i].subAssets[j].subAssets[
                k
              ].name.toLowerCase() === searchValue.toLowerCase()
            ) {
              setSelected(
                hierarchy.subAssets[i].subAssets[j].subAssets[k].assetId
              );
              localStorage.setItem(
                "selectedFlowmeterId",
                hierarchy.subAssets[i].subAssets[j].subAssets[k].assetId
              );
              return;
            }
          }
        }
      }
    }
  }, [searchValue]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const [selected, setSelected] = useState("");

  return (
    hierarchy && (
      <Box
        sx={{
          // maxWidth: "253px",

          backgroundColor: "#151B28",
          borderRadius: "4px",
          color: "white",
          height: "80.5vh",
          marginTop: "24px !important",
          ...style,
        }}
      >
        {!sidebarOpened && (
          <div
            style={{
              width: "100%",
              height: "100%",
              padding: "8px",
            }}
          >
            <OpenSidebarIcon
              onClick={() => setSidebarOpened(true)}
              style={{ marginLeft: "-8px !important" }}
            />
          </div>
        )}
        {sidebarOpened && hierarchy && sidebarWidth > 50 && (
          <div
            style={{
              overflowY: "scroll",
              width: "100%",
              overflowX: "hidden",
              height: "100%",
              padding: "7px",
            }}
          >
            <Typography
              variant="body1"
              component="p"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ListNamesIcon />
              <span style={{ marginLeft: "16px" }}>
                {translate("ListNames")}
              </span>
              <CloseSidebarIcon
                onClick={() => setSidebarOpened(false)}
                style={{ marginLeft: "auto" }}
              />
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "max-content",
                height: "40px",
                padding: "4px !important",
                gap: "12px",
                borderRadius: "4px",
                border: "1px solid #DCDCDC",
                marginTop: "16px !important",
              }}
            >
              <SearchIcon sx={{ color: "#FFFFFF", mr: 1, my: 0.5 }} />
              <input
                type="text"
                id="search"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                style={{
                  border: "none",
                  outline: "none",
                  padding: "0px !important",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "16px",
                  width: "183px",
                }}
                placeholder={translate("Search")}
              />
            </Box>

            <TreeView
              aria-label="customized"
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<StatusSquare />}
              expanded={expanded}
              onNodeToggle={handleToggle}
              selected={selected}
              onNodeSelect={(event, nodeId) => {
                setSelected(nodeId);
              }}
              sx={{ overflowX: "hidden", marginTop: "16px !important" }}
            >
              <StyledTreeItem nodeId={hierarchy.assetId} label={hierarchy.name}>
                {hierarchy.subAssets.map((area, _) => {
                  return (
                    <StyledTreeItem
                      nodeId={area.assetId}
                      label={area.name}
                      key={area.assetId}
                      sx={{ py: "4px" }}
                      onClick={() => {
                        if (component === "SelectedPage") {
                          localStorage.setItem(
                            "selectedDeviceId",
                            area.assetId
                          );
                          setSearchValue("");
                        }
                      }}
                    >
                      {area.subAssets.map((subArea, _) => {
                        return (
                          <StyledTreeItem
                            nodeId={subArea.assetId}
                            label={subArea.name}
                            key={subArea.assetId}
                            sx={{ py: "4px" }}
                            onClick={() => {
                              if (component === "SelectedPage") {
                                localStorage.setItem(
                                  "selectedDeviceId",
                                  subArea.assetId
                                );
                                setSearchValue("");
                              }
                            }}
                          >
                            {subArea.subAssets.map((subSubArea, _) => {
                              return (
                                <StyledTreeItem
                                  nodeId={subSubArea.assetId}
                                  key={subSubArea.assetId}
                                  label={subSubArea.name}
                                  onClick={() => {
                                    if (component === "SelectedPage") {
                                      localStorage.setItem(
                                        "selectedDeviceId",
                                        subSubArea.assetId
                                      );
                                      setSearchValue("");
                                    } else {
                                      localStorage.setItem(
                                        "selectedFlowmeterId",
                                        subSubArea.assetId
                                      );
                                      setSearchValue("");
                                    }
                                  }}
                                  sx={{
                                    color:
                                      subSubArea.status === "success"
                                        ? "#5AC15A"
                                        : subSubArea.status === "neutral"
                                        ? "#83B4C1"
                                        : subSubArea.status === "warning"
                                        ? "#F2C230"
                                        : "#FF6347",
                                    py: "4px",
                                  }}
                                  endIcon={
                                    <StatusSquare
                                      fill={
                                        subSubArea.status === "success"
                                          ? "#5AC15A"
                                          : subSubArea.status === "neutral"
                                          ? "#83B4C1"
                                          : subSubArea.status === "warning"
                                          ? "#F2C230"
                                          : "#FF6347"
                                      }
                                    />
                                  }
                                />
                              );
                            })}
                          </StyledTreeItem>
                        );
                      })}
                    </StyledTreeItem>
                  );
                })}
              </StyledTreeItem>
            </TreeView>
          </div>
        )}
      </Box>
    )
  );
}
