import React, {Component} from 'react';
import {Facet, MultiCheckboxFacet} from "@elastic/react-search-ui";
import {Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody} from "reactstrap";

class FileFacet extends Component {
    render() {
        return (
            <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max">
                <Row className='mb-2'><Col><Facet field="releaseversion" filterType="any" label="" show="1" view={MultiCheckboxFacet}/></Col></Row>
                <UncontrolledAccordion
                    defaultOpen={['1', '2']}
                    stayOpen
                >
                    <AccordionItem>
                        <AccordionHeader targetId='1'>
                            Experimental Strategy
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="datatype" label="" filterType="any" show="10" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionBody targetId="2">
                            Image Type
                        </AccordionBody>
                        <AccordionBody accordionId="2">
                            <Row className="mb-2">
                                <Col>
                                    <Facet field="imagetype" label="" filterType="any" show="10" view={MultiCheckboxFacet}/>
                                </Col>
                            </Row>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
                
            </Container>
        );
    }
}

export default FileFacet;