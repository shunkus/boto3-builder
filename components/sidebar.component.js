import React, { useState, useEffect } from "react";
import { List, ListItem, Grid, LinearProgress } from "@mui/material";
import SidebarMenuItemComponent from "./sidebar/menuitem.component";
import axios from "axios";
import SearchFieldComponent from "./search-field.component";

async function getServices() {
  const res = await axios.get("/api/services");
  return res.data;
}

function SidebarComponent({ setService }) {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const services = await getServices();
      setServices(services);
      setFilteredServices(services);
      setLoading(false);
    })();
  }, []);
  return (
    <Grid item xs={12} md={2}>
      <List dense>
        <ListItem>
          <SearchFieldComponent
            onChange={(e) => {
              const filteredServices = services.filter((service) =>
                service.name.match(e.target.value)
              );
              setFilteredServices(filteredServices);
            }}
          />
        </ListItem>
        {loading && <LinearProgress color="secondary" />}
        {filteredServices &&
          filteredServices.map((item) => (
            <SidebarMenuItemComponent
              setService={setService}
              service={item}
              key={item.link}
            />
          ))}
      </List>
    </Grid>
  );
}

export default SidebarComponent;
