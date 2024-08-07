import React, {Component} from 'react';
import {Facet} from "@elastic/react-search-ui";
import {MultiCheckboxFacet} from "@elastic/react-search-ui-views";
import {Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody} from "reactstrap";

class ParticipantFacet extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max">
                <Row className='mb-2'><Col><Facet field="releaseversion" filterType="any" label="" show="1" view={MultiCheckboxFacet}/></Col></Row>
                <UncontrolledAccordion defaultOpen={['1', '2', '3', '4']} stayOpen>
                    <AccordionItem>
                        <AccordionHeader targetId='1'>
                            Participant ID
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <Row className='mb-2'>
                                <Col>
                                    <Facet inputProps={{placeholder: "placeholder"}}
                                        isFilterable={true} field="redcapid"
                                        label=""
                                        filterType="any"
                                        view={(props) => <MultiCheckboxFacet {...props}
                                                                                searchPlaceholder={"Search..."}/>}/>
                                </Col>
                            </Row>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="2">
                            Sex
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="sex" label="" filterType="any" show="10" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="3">
                            Age
                        </AccordionHeader>
                        <AccordionBody accordionId="3">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="age" label="" filterType="any" show="10" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionHeader targetId="4">
                            Enrollment Category
                        </AccordionHeader>
                        <AccordionBody accordionId="4">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="tissuetype" label="" filterType="any" show="10" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
                
            </Container>
        );
    }
}


export default ParticipantFacet;