import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { GQL_postOptionData } from './gql_query/gql_optionData';
import { Button, Modal, Input, Select, Space, Divider } from 'antd';

function PostPriceDataComponent(props) {
    var itemCode =  props.itemCode;
    var itemType =  props.itemType;
    var priceData = props.priceData;
    var onDone = props.onDone;
    var onReset = props.onReset;

    let variables = {
        "code": itemCode,
        "type": itemType
    }
    for (let key in priceData) {
        if (['any', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'].includes(key)) {
            variables[key] = priceData[key];
        }
    }
    const { loading, error, data } = useQuery(GQL_postOptionData, {
        variables: variables
    });
    if (loading) {
        return (
          <Button type="primary" loading>Loading</Button>
        );
    }
    if (error) {
        setTimeout(() => {
            if (onReset) {onReset();}
        }, 1000);
        return (
          <Button type="primary" danger>Error</Button>
        )
    }
    setTimeout(() => {
        if (onDone) {onDone();}
        if (onReset) {onReset();}
    }, 1000);
    return (
      <Button>OK</Button>
    )
    
}

class PostPriceData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCode: props.itemCode,
            itemType: props.itemType,
            refetch: props.refetch,
            priceValue: {
                any: null,
                s1: null,
                s2: null,
                s3: null,
                s4: null,
                s5: null,
                s6: null,
                s7: null,
                s8: null,
            },
            modalShow: false,
            posting: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRefetchAndClose = this.handleRefetchAndClose.bind(this);
        this.handlePosting = this.handlePosting.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.onChangePriceValue = this.onChangePriceValue.bind(this);
        this.onChangeItemCode = this.onChangeItemCode.bind(this);
        this.onChangeItemType = this.onChangeItemType.bind(this);
    }

    handleShow = () => {
        this.setState(() => {
            return {modalShow: true}
        });
    }

    handleClose = () => {
        this.setState(() => {
            return {modalShow: false}
        });
    }

    handleRefetchAndClose = () => {
        this.state.refetch();
        this.setState(() => {
          return {modalShow: false}
        });
    }

    handlePosting = () => {
        this.setState(() => {
            return {posting: true}
        });
    }

    handlePost = () => {
        this.setState(() => {
            return {posting: false}
        });
    }

    checkValueHas = () => {
        let valueHas = false;
        for (let key in this.state.priceValue) {
            if (this.state.priceValue[key]) {
                valueHas = true;
                break;
            }
        }
        if (this.state.itemCode && this.state.itemType) {
            valueHas = true && valueHas;
        } else {
            valueHas = false && valueHas;
        }
        return valueHas;
    }

    onChangePriceValue = (e) => {
        let key = e.target.getAttribute('pkey').toLowerCase();
        let value = parseInt(e.target.value) || null;
        this.setState(({ priceValue }) => {
            let nextPriceValue = {...priceValue};
            nextPriceValue[key] = value;
            return {
                priceValue: nextPriceValue,
            }
        });
    }

    onChangeItemCode = (e) => {
        let value = e.target.value;
        this.setState(() => {
            return {
                itemCode: value
            }
        });
    }

    onChangeItemType = (value) => {
        this.setState(() => {
            return {
                itemType: value
            }
        });
    }

    render() {
        let valueHas = this.checkValueHas();
        return (
          <div className="post_price_data">
            <Button type="primary" onClick={this.handleShow}>Add Data</Button>
            <Modal
              visible={this.state.modalShow}
              title="Post Price Data with Socket Nunber"
              onCancel={this.handleClose}
              footer={[
                <Button key="cancel" type="primary" onClick={this.handleClose}>Cancel</Button>,
                !this.state.posting &&
                  <Button key="post" type="primary" onClick={this.handlePosting} disabled={!valueHas}>Add Data</Button>,
                this.state.posting &&
                  <PostPriceDataComponent key="posting"
                    itemCode={this.state.itemCode}
                    itemType={this.state.itemType}
                    priceData={this.state.priceValue}
                    onDone={this.handleRefetchAndClose}
                    onReset={this.handlePost}
                  />
              ]}
              bodyStyle={{ padding: '0 16px 16px' }}
            >
              <Divider orientation="left" style={{ margin: '10px 0' }}>Target Item</Divider>
              <Input.Group>
                <Select defaultValue={this.state.itemType} style={{ width: '30%' }} onChange={this.onChangeItemType}>
                  <Select.Option value="unit">ユニット</Select.Option>
                  <Select.Option value="weapon">ウェポン</Select.Option>
                </Select>
                <Input defaultValue={this.state.itemCode} placeholder="OP name or id..." style={{ width: '70%' }} onChange={this.onChangeItemCode}/>
              </Input.Group>

              <Divider orientation="left" style={{ margin: '10px 0' }}>Socket Data</Divider>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input addonBefore="ANY" placeholder="price for any socket" addonAfter="メセタ"
                  pkey="any" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S1" placeholder="price for S1" addonAfter="メセタ"
                  pkey="s1" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S2" placeholder="price for S2" addonAfter="メセタ"
                  pkey="s2" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S3" placeholder="price for S3" addonAfter="メセタ"
                  pkey="s3" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S4" placeholder="price for S4" addonAfter="メセタ"
                  pkey="s4" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S5" placeholder="price for S5" addonAfter="メセタ"
                  pkey="s5" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S6" placeholder="price for S6" addonAfter="メセタ"
                  pkey="s6" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S7" placeholder="price for S7" addonAfter="メセタ"
                  pkey="s7" onChange={this.onChangePriceValue}/>
                <Input addonBefore="S8" placeholder="price for S8" addonAfter="メセタ"
                  pkey="s8" onChange={this.onChangePriceValue}/>
              </Space>
            </Modal>
          </div>
        )
    }
}

export default PostPriceData;
