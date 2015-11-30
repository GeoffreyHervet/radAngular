<?php

namespace Rad\MagentoConfigBundle\Processor;

class ApiProcessor
{
    /**
     * @var \SoapClient
     */
    protected $soapClient;

    /**
     * @var array
     */
    private $credentials;

    /**
     * @var sessionId
     */
    protected $sessionId;

    public function __construct($url, $user, $pass)
    {
        $this->credentials = array(
            $user, $pass
        );
        $this->sessionId = null;
        $this->soapClient = new \SoapClient($url, array('trace' => 1, 'connection_timeout' => 120));
    }

    /**
     * @return ApiProcessor
     */
    public function connect()
    {
        if (!$this->sessionId)
        {
            $this->sessionId = $this->soapClient->login($this->credentials[0], $this->credentials[1]);
        }

        return $this;
    }

    public function __call($name, $arguments)
    {
        $this->connect();
        array_unshift($arguments, $this->sessionId);
        return $this->soapClient->__call($name, $arguments);
    }
}