import React from "react";
import {
  Grid,
  Col,
  Row,
  Icon,
  FormGroup,
  InputGroup,
  FormControl,
  ListView,
  ListViewInfoItem,
  ListViewIcon,
  ListViewItem,
  ListViewRow,
} from "patternfly-react";
import "./style.css";

export default class MyContentPage extends React.Component {
  render() {
    const placeholderSearch = "Search";
    return (
      <div>
        <Grid width="100%">
          <Row>
            <h1> Import Your Content from Github</h1>
          </Row>
          <Row>
            <p>
              Click the toggle next to the repository to reveal a check mark.
              This will add the repository to Galaxy, making it visible on the
              Search page and allowing anyone to download it. Removing the check
              mark will delete the repository from Galaxy. Use settings to
              enable Travis notifications and control the repository name.
            </p>
            <p>
              If you don&#44t see all of your repositories, review and add your
              authorized organizations.
            </p>
          </Row>
          <Row style={{ borderBottom: "1px solid grey", padding: 20 }}>
            <Col xs={12} md={6}>
              <h2 />
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" placeholder={placeholderSearch} />
                  <InputGroup.Addon>
                    <Icon name="search" />
                  </InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <ListView>
              <ListViewItem
                actions={<div />}
                checkboxInput={<input />}
                leftContent={<ListViewIcon />}
                additionalInfo={[<ListViewInfoItem />, <ListViewInfoItem />]}
                heading="Item 1"
                description="This is Item 1 description"
                compoundExpandText={{hosts: "Text describing Item 1's hosts", clusters: "Text describing Item 1's clusters", nodes: "Text describing Item 1's nodes"}}
              >
                <Row>
                  <Col sm={11}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                  </Col>
                </Row>
              </ListViewItem>
            </ListView>
          </Row>
        </Grid>
      </div>
    );
  }
}
